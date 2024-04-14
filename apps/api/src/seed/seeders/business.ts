import bcrypt from 'bcryptjs';

import { dbClient } from '../client';


const BusinessSeeds = {
  run: async () => {
    const userId = "4b496a07-6ec1-4ca9-83a8-804c34248a38";
    const agencyRoleId = "ad0499c5-e718-47e4-9b95-c656aa771d74";
    const agencyId = "c8e42498-7742-43f1-9669-74b8f1d05678";
    const agentId = "04c59edb-0abb-4ff5-b917-e03ed67a21bb"

    await dbClient
      .insertInto('Agency')
      .values({
        id: agencyId,
        name: 'FIRS'
      })
      .onConflict((oc) => oc.column('id').doNothing())
      .execute();


    await dbClient
      .insertInto('User')
      .values({
        id: userId,
        username: 'agent007',
        email: 'agent007@agent.com',
        password: bcrypt.hashSync('password'),
        status: 'ACTIVE',
        roleId: agencyRoleId
      })
      .onConflict((oc) => oc.column('id').doNothing())
      .execute();

    await dbClient
      .insertInto('Agent')
      .values({
        id: agentId,
        lastName: "Bond",
        firstName: "James",
        userId: userId,
        agencyId: agencyId
      })
      .onConflict((oc) => oc.column('id').doNothing())
      .execute();

    await dbClient
      .insertInto('Business')
      .values([
        {
          id: "559f6c03-ff5a-4fcb-bbca-cf6e7e562dcd",
          name: "Julius Berger",
          phoneNumber: "08162510001",
          email: "julius@berger.com",
          status: "REJECTED",
          additionalData: {},
          agencyId,
          agentId
        },
        {
          id: "76a4b7ed-811e-4c6d-bb5e-efa18f440a63",
          name: "Doe Enterprises",
          phoneNumber: "08012345678",
          email: "john@doe.com",
          status: "REJECTED",
          additionalData: {},
          agencyId,
          agentId
        },
        {
          id: "fdbfd7dc-646d-4dc5-82d6-0b22b8d2ff5f",
          name: "Smith & Co.",
          phoneNumber: "09098765432",
          email: "jane@smith.com",
          status: "COMPLETE_AGENT_VERIFICATION",
          additionalData: {},
          agencyId,
          agentId,
        },
        {
          id: "9b8f1f6f-6a8d-4d6d-8950-5b3db4884f63",
          name: "Johnson Enterprises",
          phoneNumber: "07011223344",
          email: "michael@johnson.com",
          status: 'COMPLETE_AGENT_VERIFICATION',
          additionalData: {},
          agencyId,
          agentId,
        },
        {
          id: "2f6916c1-fabf-4c6e-894e-7e62bea02a1c",
          name: "Brown Industries",
          phoneNumber: "08151122334",
          email: "emily@brown.com",
          status: 'PENDING',
          additionalData: {},
          agencyId,
        },
        {
          id: "3d4ac5e7-5eb6-4811-a8f5-83d5d10b8d4f",
          name: "Clark Corporation",
          phoneNumber: "08097654321",
          email: "william@clark.com",
          status: 'PENDING',
          additionalData: {},
          agencyId
        },
        {
          id: "ec1ac8a9-1127-426e-a6f1-2a84b3cfc46b",
          name: "Martinez Holdings",
          phoneNumber: "09099876543",
          email: "sophia@martinez.com",
          status: "VERIFIED",
          additionalData: {},
          agencyId,
          agentId,

        },
        {
          id: "b95e0c58-64f9-4420-8268-73bb2e45fd21",
          name: "Miller & Sons",
          phoneNumber: "07011223344",
          email: "miller@sons.com",
          status: "VERIFIED",
          additionalData: {},
          agencyId,
          agentId,

        },
        {
          id: "8cf60c8e-7c4d-4633-86b4-3c7f0b32e25c",
          name: "Garcia Enterprises",
          phoneNumber: "08123456789",
          email: "garcia@enterprises.com",
          status: 'PENDING_AGENT_VERIFICATION',
          additionalData: {},
          agencyId,
          agentId,
        },
        {
          id: "d0f1c53e-641d-4b3c-810f-3e6834538eb9",
          name: "Taylor Group",
          phoneNumber: "09099887766",
          email: "taylor@group.com",
          status: 'PENDING_AGENT_VERIFICATION',
          additionalData: {},
          agencyId,
          agentId,
        }
      ]
      )
      .onConflict((oc) => oc.column('id').doNothing())
      .execute();
  },
};

export default BusinessSeeds;
