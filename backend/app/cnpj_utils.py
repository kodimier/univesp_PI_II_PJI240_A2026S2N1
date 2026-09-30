def digits_only(value: str) -> str:
    return "".join(ch for ch in value if ch.isdigit())


def parse_cnpj(value: str) -> str:
    digits = digits_only(value)
    if len(digits) != 14:
        raise ValueError("CNPJ deve ter 14 dígitos")
    return digits
