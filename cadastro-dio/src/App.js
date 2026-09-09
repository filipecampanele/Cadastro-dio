import React, { useState } from 'react';
import styled from 'styled-components';

// ===== Componentes estilizados (styled-components) =====
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const Card = styled.div`
  background: #fff;
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 30px;
  color: #6236ff;
  margin-bottom: 4px;
  span {
    color: #ff2d78;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-bottom: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.$hasError ? '#FF4D4D' : '#E0E0E0')};
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #6236ff;
  }
`;

const ErrorMsg = styled.span`
  color: #ff4d4d;
  font-size: 12px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #6236ff, #ff2d78);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.15s;
  &:hover {
    opacity: 0.92;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 13px;
  color: #666;
`;

const LinkButton = styled.a`
  color: #6236ff;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;

const SuccessBox = styled.div`
  text-align: center;
  padding: 20px 0;
  h2 {
    color: #22a559;
    margin-bottom: 8px;
  }
  p {
    color: #555;
    font-size: 14px;
  }
`;

// ===== Componente principal (Hooks + validação de formulário) =====
function App() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    const novosErros = {};

    if (!form.nome.trim()) {
      novosErros.nome = 'Informe seu nome completo';
    } else if (form.nome.trim().split(' ').length < 2) {
      novosErros.nome = 'Informe nome e sobrenome';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      novosErros.email = 'Informe seu e-mail';
    } else if (!emailRegex.test(form.email)) {
      novosErros.email = 'E-mail inválido';
    }

    if (!form.senha) {
      novosErros.senha = 'Informe uma senha';
    } else if (form.senha.length < 6) {
      novosErros.senha = 'A senha deve ter ao menos 6 caracteres';
    }

    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme sua senha';
    } else if (form.confirmarSenha !== form.senha) {
      novosErros.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validar()) {
      setEnviado(true);
    }
  }

  function handleNovoCadastro() {
    setForm({ nome: '', email: '', senha: '', confirmarSenha: '' });
    setErrors({});
    setEnviado(false);
  }

  return (
    <Container>
      <Card>
        {!enviado ? (
          <>
            <Logo>
              DIO<span>.</span>
            </Logo>
            <Subtitle>Crie sua conta e comece a evoluir</Subtitle>

            <Form onSubmit={handleSubmit} noValidate>
              <Field>
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={form.nome}
                  onChange={handleChange}
                  $hasError={!!errors.nome}
                />
                {errors.nome && <ErrorMsg>{errors.nome}</ErrorMsg>}
              </Field>

              <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  $hasError={!!errors.email}
                />
                {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
              </Field>

              <Field>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.senha}
                  onChange={handleChange}
                  $hasError={!!errors.senha}
                />
                {errors.senha && <ErrorMsg>{errors.senha}</ErrorMsg>}
              </Field>

              <Field>
                <Label htmlFor="confirmarSenha">Confirmar senha</Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  placeholder="Repita a senha"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  $hasError={!!errors.confirmarSenha}
                />
                {errors.confirmarSenha && (
                  <ErrorMsg>{errors.confirmarSenha}</ErrorMsg>
                )}
              </Field>

              <Button type="submit">Cadastrar</Button>
            </Form>

            <FooterText>
              Já tem conta? <LinkButton href="#">Faça login</LinkButton>
            </FooterText>
          </>
        ) : (
          <SuccessBox>
            <h2>Cadastro realizado!</h2>
            <p>
              Bem-vindo(a), {form.nome.split(' ')[0]}! Sua conta na DIO foi
              criada com sucesso.
            </p>
            <Button onClick={handleNovoCadastro} style={{ marginTop: '24px' }}>
              Fazer novo cadastro
            </Button>
          </SuccessBox>
        )}
      </Card>
    </Container>
  );
}

export default App;