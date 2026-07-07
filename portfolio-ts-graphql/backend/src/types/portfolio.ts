import { StringValueNode } from "graphql";

export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    stack: string[];
}

export interface Skill{
    id: number;
    name: string;
    value: number;
    category: string;

}

export interface Experience {
    id: number;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
}

export type ContactMessageInput = {
    name: string;
    email: string;
    message: string;
}

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}