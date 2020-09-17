import pkg from "apollo-server-express";
const { gql } = pkg;

export const typeDefs = gql`
  type Host {
    id: String!
    meetingId: String!
    hostHash: String!
  }

  type Attendee {
    id: String!
    meetingId: String!
    attendeeHash: String!
  }

  type Meeting {
    id: String!
  }

  type Presentation {
    meetingId: String!
  }

  type Slide {
    presentation: Presentation
  }

  type Template {
    name: String!
    type: Block
  }

  enum Block {
    TEXT
    QR
    POLL
    MATCH
    FILL
  }

  type Query {
    
  }

`;
