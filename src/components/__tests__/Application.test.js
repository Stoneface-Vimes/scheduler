import React from "react";
import axios from "axios";

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
  queryByText,
  cleanup
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );
    // 3. Click the "Delete" button on the first empty appointment.
    fireEvent.click(getByAltText(container, "Delete"))
    // 4. Click "Confirm"
    fireEvent.click(getByText(container, "Confirm"))
    // 5. Check that the element with the text "Deleting..." is removed.
    await waitForElementToBeRemoved(() => getByText(container, "Deleting..."))
    // 6. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // console.log(prettyDOM(day))

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    //1 Render
    const { container } = render(<Application />);
    //2 wait unti; evetything is loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3 click on edit
    fireEvent.click(getByAltText(container, "Edit"))
    //4 change the name
    fireEvent.change(getByPlaceholderText(container, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //5 change the interviewer
    fireEvent.click(getByAltText(container, "Tori Malcolm"))
    //6 Click save
    fireEvent.click(getByText(container, "Save"))
    //7 check that saving is happeninig
    await waitForElementToBeRemoved(() => getByText(container, "Saving..."))
    //8 check that the proper name is there
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //1 Render
    const { container } = render(<Application />);
    //2 wait unti; evetything is loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3 click on edit
    fireEvent.click(getByAltText(container, "Edit"))
    //6 Click save
    fireEvent.click(getByText(container, "Save"))
    //7 check that saving is happeninig
    await waitForElementToBeRemoved(() => getByText(container, "Saving..."))
    //8 checks that the error shows up
    getByText(container, "An error occurred while saving")
    //9 hit close
    fireEvent.click(getByAltText(container, "Close"))
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    //1 Render
    const { container } = render(<Application />);
    //2 wait unti; evetything is loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3 click on delete
    fireEvent.click(getByAltText(container, "Delete"))
    //6 Click save
    fireEvent.click(getByText(container, "Confirm"))
    //7 check that saving is happeninig
    await waitForElementToBeRemoved(() => getByText(container, "Deleting..."))
    //8 checks that the error shows up
    getByText(container, "An error occurred while deleting")
    //9 hit close
    fireEvent.click(getByAltText(container, "Close"))
  });

})





