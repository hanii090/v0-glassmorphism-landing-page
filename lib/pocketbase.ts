// PocketBase configuration
// Install: npm install pocketbase

import PocketBase from "pocketbase"

const pb = new PocketBase("http://127.0.0.1:8090") // Your PocketBase URL

export default pb

// Example schema for submissions collection:
/*
{
  "id": "string",
  "fullName": "string",
  "email": "string", 
  "deadline": "datetime",
  "subject": "string",
  "description": "text",
  "assignmentFile": "file",
  "paymentProof": "file",
  "status": "select (pending, in-progress, completed)",
  "created": "datetime",
  "updated": "datetime"
}
*/

// Example usage:
export async function createSubmission(data: any) {
  try {
    const record = await pb.collection("submissions").create(data)
    return record
  } catch (error) {
    console.error("Error creating submission:", error)
    throw error
  }
}

export async function getSubmissions() {
  try {
    const records = await pb.collection("submissions").getFullList({
      sort: "-created",
    })
    return records
  } catch (error) {
    console.error("Error fetching submissions:", error)
    throw error
  }
}

export async function updateSubmissionStatus(id: string, status: string) {
  try {
    const record = await pb.collection("submissions").update(id, { status })
    return record
  } catch (error) {
    console.error("Error updating submission:", error)
    throw error
  }
}
