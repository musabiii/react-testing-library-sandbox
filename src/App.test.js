import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("render App", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);

    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByAltText(/search image/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });

  it("render find by App", async () => {
    render(<App />);
    // expect(screen.queryByText(/Search for react/i)).toBeNull();
    expect(screen.queryByText(/Logged in as/i)).toBeNull();
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
  });

  it("fire Event", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    screen.debug();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });
    screen.debug();
  });

  it("user Event", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    screen.debug();
    userEvent.type(screen.getByRole("textbox"), "React");
    screen.debug();
  });
});

describe("first", () => {
  it("checkbox fireEvent", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toBeCalled();
    expect(checkbox).toBeChecked();
  });

  it("checkbox userEvent", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;

    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(handleChange).toBeCalled();
    expect(checkbox).toBeChecked();
  });

  it("checkbox userEvent double click", () => {
    const onChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={onChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("input field", () => {
    const { container } = render(<input type="text" className="someInput" />);
    const input = container.getElementsByClassName("someInput");
    expect(input).not.toBeNull();
  });

  it("focus", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );

    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select", () => {
    const { selectOptions, getByRole, getByText } = render(
      <select> //with mustiple attribute role become combolist
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    userEvent.selectOptions(getByRole("combobox"), "1");
    expect(getByText('A').selected).toBeTruthy();

    userEvent.selectOptions(getByRole("combobox"), "2");
    expect(getByText('B').selected).toBeTruthy();
    expect(getByText('A').selected).toBeFalsy();
  });
});
