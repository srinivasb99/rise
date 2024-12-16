import axios from 'axios';

const CALENDLY_API_URL = 'https://api.calendly.com';
const PERSONAL_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzM0MzEwNzIxLCJqdGkiOiI0YmNmOTMxNS1hNjIxLTQzYTItYjQwZC0wMmRiNjM2OGE3NmYiLCJ1c2VyX3V1aWQiOiI2MzZiNmM3MC0yYTg2LTQ0OWEtOTgwMy1kM2MwZTA0MGQxM2QifQ.tzD5_NA1KPAgOXbqmediWOPpm6Ppla_YTnvI-8jBObR98cnT82CqDtRda2P_alVg1jw72gQmhG34t9p1mizmWQ';

// Your 30-minute event type UUID from Calendly:
const EVENT_TYPE_UUID = 'bfac17e0-1586-41e2-a087-6e45557d6c42';

// Your user URI (fetched from GET /users/me):
const USER_URI = 'https://api.calendly.com/users/636b6c70-2a86-449a-9803-d3c0e040d13d';

interface ScheduleEventParams {
  email: string;
  name: string;
  date: string;   // e.g. "2024-12-19"
  time: string;   // ISO datetime string (e.g. "2024-12-19T09:00:00Z") returned by getAvailableTimeSlots
  notes?: string;
  selectedServices: string[];
}

// Create a scheduling link for the specified event type
async function createSchedulingLink(): Promise<string> {
  const response = await axios.post(
    `${CALENDLY_API_URL}/scheduling_links`,
    {
      event_type: `${CALENDLY_API_URL}/event_types/${EVENT_TYPE_UUID}`,
      owner: USER_URI,
      max_event_count: 1
    },
    {
      headers: {
        Authorization: `Bearer ${PERSONAL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  // The resource.uri is the full scheduling link URI
  return response.data.resource.uri;
}

// Fetch available time slots by using the scheduling link to get invitee availability
export async function getAvailableTimeSlots(date: string): Promise<string[]> {
  const startTime = `${date}T00:00:00Z`;
  const endTime = `${date}T23:59:59Z`;

  try {
    // Create a scheduling link
    const schedulingLinkURI = await createSchedulingLink();
    const schedulingLinkUUID = schedulingLinkURI.split('/').pop(); // Extract the UUID from the URI

    const response = await axios.get(
      `${CALENDLY_API_URL}/scheduling_links/${schedulingLinkUUID}/invitee_availability`,
      {
        headers: {
          Authorization: `Bearer ${PERSONAL_TOKEN}`
        },
        params: {
          start_time: startTime,
          end_time: endTime
        }
      }
    );

    const slots = response.data.collection || [];
    // Each slot object contains start_time, which we can return
    return slots.map((slot: any) => slot.start_time);
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw error;
  }
}

// Schedule an event using Calendly's scheduled_events endpoint
export async function scheduleEvent({
  email,
  name,
  date,
  time,
  notes,
  selectedServices
}: ScheduleEventParams) {
  const startTimeISO = time; // `time` should already be an ISO datetime string from availability

  // Construct the payload according to Calendly API spec for scheduled_events
  const payload = {
    event: {
      event_type: `${CALENDLY_API_URL}/event_types/${EVENT_TYPE_UUID}`,
      start_time: startTimeISO,
      invitees: [
        {
          email,
          name,
          questions_and_answers: [
            {
              question: 'Selected Services',
              answer: selectedServices.join(', ')
            },
            {
              question: 'Additional Notes',
              answer: notes || 'None provided'
            }
          ]
        }
      ]
    }
  };

  try {
    const response = await axios.post(
      `${CALENDLY_API_URL}/scheduled_events`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${PERSONAL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error scheduling Calendly event:', error);
    throw error;
  }
}
