# Backend — PG AVCB CRM

API FastAPI da landing page e do CRM. Rode a partir desta pasta.

## Desenvolvimento

```powershell
.\scripts\install.ps1
.\scripts\dev.ps1
```

API em `http://localhost:8000`. Documentação: `http://localhost:8000/docs`.

Copie `.env.example` para `.env` e preencha:

| Variável | Uso |
|---|---|
| `CORS_ORIGINS` | Origens do Next.js (produção: `https://dominio-da-pgavcb`) |
| `FIREBASE_CREDENTIALS_PATH` | Caminho do JSON de conta de serviço |
| `CRM_API_TOKEN` | Se preenchido, o painel precisa enviar `X-API-Key` ou `Authorization: Bearer` |
| `WHATSAPP_VERIFY_TOKEN` | Token de verificação do webhook na Meta |
| `WHATSAPP_ACCESS_TOKEN` / `WHATSAPP_PHONE_NUMBER_ID` | Envio real pela Cloud API |

Rotas públicas: landing (`/api/services`, `/api/assets`, `/api/contact`) e webhook do WhatsApp. Leads, atendentes, CNPJ e a fila do CRM ficam protegidos quando há `CRM_API_TOKEN`.

O formulário da landing grava contato **e** abre um lead com origem `landing`.

## Testes

```powershell
.\scripts\test.ps1
```

O GitHub Actions (`.github/workflows/backend-tests.yml`) executa o mesmo pytest em todo push na `dev`/`main`.

## Deploy (quinzena 6 — domínio)

1. Subir este serviço (Render, Railway ou VM) com o `Dockerfile` ou o `render.yaml` da raiz.
2. Configurar as variáveis de ambiente no painel do provedor (nunca no Git).
3. Apontar `CORS_ORIGINS` e `NEXT_PUBLIC_API_URL` do frontend para o HTTPS público da API.
4. Na Meta, o webhook deve ser `https://<api>/api/whatsapp/webhook`.
5. O domínio da empresa (site + API) é configurado no provedor; o código já lê `PORT` e CORS por ambiente.
