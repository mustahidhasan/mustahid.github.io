import { buildSchema } from "graphql";
export const schema = buildSchema(`
    type project {
        id: ID!
        title: String!
        description: String!
        imageUrl: String!
        tags: [String!]!
        stack: [String!]!
    }
    type Skill {
        id: ID!
        name: String!
        value: Int!
        category: String!
    }

    type Experience {
        id: ID!
        company: String!
        role: String!
        location: String!
        startDate: String!
        endDate: String!
        description: String!
        skills: [String!]!
    }

    type ContactMessage {
        id: ID!
        name: String!
        email: String!
        message: String!
        createdAt: String!
    }
    
    input ContactMessageInput {
        name: String!
        email: String!
        message: String!

    }
    type Query {
        projects: [Project!]!
        project(id:ID):Project
        skills: [Skill!]!
        experiences: [Experience!]!
    }
    type Mutation {
        createContactMessage(input: ContactMessageInput!): ContactMessage!
    }
`)      