import axios from 'axios';

const CALENDLY_API_URL = 'https://api.calendly.com';
const PERSONAL_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzM0MzEwNzIxLCJqdGkiOiI0YmNmOTMxNS1hNjIxLTQzYTItYjQwZC0wMmRiNjM2OGE3NmYiLCJ1c2VyX3V1aWQiOiI2MzZiNmM3MC0yYTg2LTQ0OWEtOTgwMy1kM2MwZTA0MGQxM2QifQ.tzD5_NA1KPAgOXbqmediWOPpm6Ppla_YTnvI-8jBObR98cnT82CqDtRda2P_alVg1jw72gQmhG34t9p1mizmWQ';

// Your 30-minute event type UUID:
const EVENT_TYPE_UUID = 'bfac17e0-1586-41e2-a087-6e45557d6c42';

// Replace this with the `current_organization` URI from your user data
const ORGANIZATION_URI = 'https://api.calendly.com/organizations/0abc0aed-104a-45e5-9dcb-48a16f66daee';

interface ScheduleEventParams {
  email: string;
  name: string;
  date: string;   // format: YYYY-MM-DD
  time: string;   // ISO datetime string (e.g. "2024-12-19T09:00:00Z")
  notes?: string;
  selectedServices: string[];
}

async function createSchedulingLink(): Promise<string> {
  const payload = {
    event_type: `${CALENDLY_API_URL}/event_types/${EVENT_TYPE_UUID}`,
    owner: ORGANIZATION_URI,
    owner_type: 'Organization'
  };

  const response = await axios.post(
    `${CALENDLY_API_URL}/scheduling_links`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${PERSONAL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.resource.uri;
}

export async function getAvailableTimeSlots(date: string): Promise<string[]> {
  const startTime = `${date}T00:00:00Z`;
  const endTime = `${date}T23:59:59Z`;

  try {
    const schedulingLinkURI = await createSchedulingLink();
    const schedulingLinkUUID = schedulingLinkURI.split('/').pop();

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
    return slots.map((slot: any) => slot.start_time);
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw error;
  }
}

export async function scheduleEvent({
  email,
  name,
  date,
  time,
  notes,
  selectedServices
}: ScheduleEventParams) {
  const payload = {
    event: {
      event_type: `${CALENDLY_API_URL}/event_types/${EVENT_TYPE_UUID}`,
      start_time: time, // `time` should be an ISO string returned from getAvailableTimeSlots
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
