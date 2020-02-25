import React from "react";

import {
  render,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  findByDisplayValue,
  waitForElementToBeRemoved,
  findByTestId,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

describe("Application", () => {

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0]


    fireEvent.click(getByAltText(appointment, "Add"))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, "Save"))


    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );  


    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

})





