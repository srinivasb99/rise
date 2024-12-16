import axios from 'axios';

const CALENDLY_API_URL = 'https://api.calendly.com';
const PERSONAL_TOKEN = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzM0MzEwNzIxLCJqdGkiOiI0YmNmOTMxNS1hNjIxLTQzYTItYjQwZC0wMmRiNjM2OGE3NmYiLCJ1c2VyX3V1aWQiOiI2MzZiNmM3MC0yYTg2LTQ0OWEtOTgwMy1kM2MwZTA0MGQxM2QifQ.tzD5_NA1KPAgOXbqmediWOPpm6Ppla_YTnvI-8jBObR98cnT82CqDtRda2P_alVg1jw72gQmhG34t9p1mizmWQ';

interface ScheduleEventParams {
  email: string;
  name: string;
  date: string;
  time: string;
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
  try {
    const response = await axios.post(
      `${CALENDLY_API_URL}/scheduled_events`,
      {
        event_type: 'consultation',
        start_time: `${date}T${time}:00Z`,
        email,
        name,
        custom_questions: [
          {
            question: 'Selected Services',
            answer: selectedServices.join(', ')
          },
          {
            question: 'Additional Notes',
            answer: notes || 'None provided'
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${PERSONAL_TOKEN}`,
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
  try {
    const response = await axios.get(
      `${CALENDLY_API_URL}/user/availability`,
      {
        params: {
          date,
          duration: 30 // 30-minute slots
        },
        headers: {
          'Authorization': `Bearer ${PERSONAL_TOKEN}`
        }
      }
    );

    return response.data.available_times;
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw error;
  }
}
