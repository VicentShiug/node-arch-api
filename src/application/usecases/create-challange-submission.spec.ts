import { InMemoryChallengesRepository } from "../../../tests/in-memory-challenge-repository";
import { InMemoryStudentsRepository } from "../../../tests/in-memory-students-repository";
import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/students";
import { CreateChallengeSubmission } from "./create-challange-submission"

describe('Create Challenge Submission use case', () => {
  it('should be able to create a new challenge submission', async () => {
    const studentRepository = new InMemoryStudentsRepository();
    const challengesRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      email: 'fake-email',
      name: 'fake-name'
    })

    const challenge = Challenge.create({
      title: 'fake-title',
      instructionsUrl: 'fake-instructions-url'
    })

    studentRepository.items.push(student)

    challengesRepository.items.push(challenge)

    const sut = new CreateChallengeSubmission(
      studentRepository,
      challengesRepository
    );

    const response = await sut.execute({
      studentId: student.id,
      challengeId: challenge.id
    })


    expect(response).toBeTruthy()
  })
})