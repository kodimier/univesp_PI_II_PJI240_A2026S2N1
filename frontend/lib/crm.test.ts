import { afterEach, describe, expect, it, vi } from "vitest";
import { sendContact } from "./crm";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("crm API", () => {
  it("should reject with the backend error detail when the contact endpoint fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ detail: "Erro ao salvar mensagem." }),
      })
    );

    await expect(
      sendContact({
        name: "Empresa Teste",
        email: "teste@empresa.com",
        phone: "11999999999",
        message: "Preciso de ajuda com AVCB.",
      })
    ).rejects.toThrow("Erro ao salvar mensagem.");
  });
});
