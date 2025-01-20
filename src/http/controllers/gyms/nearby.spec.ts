import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Nearby User Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to list nearby gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia 1",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -19.8380901,
        longitude: -43.7947809,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia 2",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -19.9272542,
      longitude: -43.9464008,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ 
        latitude: -19.8380901,
        longitude: -43.7947809,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.statusCode).toEqual(201);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Academia 1" }),
      ])
    );
  });
});
