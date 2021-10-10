import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import apiService from "./service";

jest.mock("./service");

test("renders label", () => {
  render(<App />);
  const label = screen.getByText("Digite o cep");
  expect(label).toBeInTheDocument();
});

test("call api function", async () => {
  const logradouro = "Rua Teste";
  apiService.get.mockReturnValue({ logradouro });

  render(<App />);

  const input = screen.getByPlaceholderText("cep");

  userEvent.type(input, "12345678");
  userEvent.tab();

  await waitFor(() => expect(apiService.get).toHaveBeenCalled());

  const logradouroText = screen.getByText(logradouro);
  expect(logradouroText).toBeInTheDocument();
});

test("call api function with invalid cep", async () => {
  const erro = true;
  apiService.get.mockReturnValue({ erro });

  render(<App />);

  const input = screen.getByPlaceholderText("cep");

  userEvent.type(input, "99999999");
  userEvent.tab();

  await waitFor(() => expect(apiService.get).toHaveBeenCalled());

  const logradouroText = screen.getByText("Cep invalido");
  expect(logradouroText).toBeInTheDocument();
});

test("should not call api with less than 8 numbers", async () => {
  const erro = true;
  apiService.get.mockReturnValue({ erro });

  render(<App />);

  const input = screen.getByPlaceholderText("cep");

  userEvent.type(input, "12345");
  userEvent.tab();

  await waitFor(() => expect(apiService.get).not.toHaveBeenCalled());
});

test("call api throw any error", async () => {
  const error = { message: "any error" };
  apiService.get.mockRejectedValue({ error });

  render(<App />);

  const input = screen.getByPlaceholderText("cep");

  userEvent.type(input, "99999999");
  userEvent.tab();

  await waitFor(() => expect(apiService.get).toHaveBeenCalled());

  const logradouroText = screen.getByText("Erro ao consultar api");
  expect(logradouroText).toBeInTheDocument();
});
