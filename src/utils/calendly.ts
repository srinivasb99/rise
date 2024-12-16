// src/utils/calendly.ts
import axios from 'axios';

const CALENDLY_API_URL = 'https://api.calendly.com';
const PERSONAL_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzM0MzEwNzIxLCJqdGkiOiI0YmNmOTMxNS1hNjIxLTQzYTItYjQwZC0wMmRiNjM2OGE3NmYiLCJ1c2VyX3V1aWQiOiI2MzZiNmM3MC0yYTg2LTQ0OWEtOTgwMy1kM2MwZTA0MGQxM2QifQ.tzD5_NA1KPAgOXbqmediWOPpm6Ppla_YTnvI-8jBObR98cnT82CqDtRda2P_alVg1jw72gQmhG34t9p1mizmWQ';

// This is the UUID you fetched from the Calendly API for your "30min" event.
const EVENT_TYPE_UUID = 'bfac17e0-1586-41e2-a087-6e45557d6c42';

interface ScheduleEventParams {
  email: string;
  name: string;
  date: string; // format: YYYY-MM-DD
  time: string; // an ISO datetime selected from available times
  notes?: string;
  selectedServices: string[];
}

export async function scheduleEvent({
  email,
  name,
  date,
  time,
  notes,
  selectedServices
}: ScheduleEventParams) {
  // The Calendly API expects a start_time in ISO8601 format with timezone.
  // If `time` is already an ISO string returned by the API, use it directly.
  // If `time` is just HH:MM, convert it:
  // Example: `${date}T${time}:00Z`

  const startTimeISO = `${date}T${time}:00Z`;

  try {
    const response = await axios.post(
      `${CALENDLY_API_URL}/scheduled_events`,
      {
        event: {
          event_type: `${CALENDLY_API_URL}/event_types/${EVENT_TYPE_UUID}`,
          start_time: startTimeISO,
          // Additional fields like "end_time" might be automatically determined by Calendly for a given event_type duration.
          invitees: [
            {
              email,
              name,
              questions_and_answers: [
                {
                  question: 'Selected Services',
                  answer: selectedServices.join(', '),
                },
                {
                  question: 'Additional Notes',
                  answer: notes || 'None provided',
                },
              ]
            }
          ]
        }
      },
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

export async function getAvailableTimeSlots(date: string) {
  // Get availability for a single day: use start_time at midnight and end_time before next midnight
  const startTime = `${date}T00:00:00Z`;
  const endTime = `${date}T23:59:59Z`;

  try {
    const response = await axios.get(
      `${CALENDLY_API_URL}/event_types/${EVENT_TYPE_UUID}/availability`,
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

    // response.data.collection might contain an array of time slots
    // Each slot might look like: { start_time: "2024-12-31T09:00:00Z", ... }
    const slots = response.data.collection || [];

    // Extract and return start_time strings
    return slots.map((slot: any) => slot.start_time);
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw error;
  }
}
