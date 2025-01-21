import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to search gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia 1",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -19.9320754,
        longitude: -43.9503757,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia 2",
        description: "A melhor academia do Brasil",
        phone: "123456789",
        latitude: -19.9320754,
        longitude: -43.9503757,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({ q: "Academia" })
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(2);
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Academia 1" }),
        expect.objectContaining({ title: "Academia 2" }),
      ])
    );
  });
});
