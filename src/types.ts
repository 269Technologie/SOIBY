/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Realisation {
  id: string;
  title: string;
  description: string;
  badge: string;
  techs: string[];
  features: string[];
  impact: string;
  details: string;
}

export interface Expertise {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  bullets: string[];
  color: string;
}

export interface TimeSlot {
  time: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface DayAvailability {
  date: string;
  label: string;
  slots: TimeSlot[];
}
