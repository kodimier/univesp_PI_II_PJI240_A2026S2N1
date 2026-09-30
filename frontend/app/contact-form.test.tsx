import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ContactForm } from './contact-form'
import * as crmAPI from '@/lib/crm'

// Mocking the API call
vi.mock('@/lib/crm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/crm')>()
  return {
    ...actual,
    sendContact: vi.fn(),
    lookupCnpj: vi.fn()
  }
})

describe('ContactForm', () => {
  it('should render all standard fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/Nome ou Razão Social/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Telefone \(opcional\)/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/CNPJ/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Mensagem/i)).toBeInTheDocument()
    
    expect(screen.getByRole('button', { name: /Enviar mensagem/i })).toBeInTheDocument()
  })

  it('should attempt to fetch CNPJ when a 14 digit CNPJ is blurred', async () => {
    const mockedLookup = vi.mocked(crmAPI.lookupCnpj)
    mockedLookup.mockResolvedValueOnce({
      cnpj: '12345678000190',
      razao_social: 'EMPRESA DE TESTE LTDA',
      fetched_at: new Date().toISOString()
    })

    render(<ContactForm />)
    const cnpjInput = screen.getByLabelText(/CNPJ/i)
    
    // Typing 14 digits
    fireEvent.change(cnpjInput, { target: { value: '12345678000190' } })
    fireEvent.blur(cnpjInput)

    // Wait for the mock to be called and state to settle
    await waitFor(() => {
      expect(mockedLookup).toHaveBeenCalledWith('12345678000190')
    })
  })
})
