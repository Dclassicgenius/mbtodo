import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/components/Modal";

describe("Modal", () => {
  test("renders the modal when modalOpen is true", () => {
    render(
      <Modal handleClose={() => {}} modalOpen={true}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Modal Content")).toBeTruthy();
  });

  test("does not render the modal when modalOpen is false", () => {
    render(
      <Modal handleClose={() => {}} modalOpen={false}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).toBeNull();
  });

  test("calls handleClose when backdrop is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal handleClose={handleClose} modalOpen={true}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("backdrop"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("does not call handleClose when dialog is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal handleClose={handleClose} modalOpen={true}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText("Modal Content"));

    expect(handleClose).not.toHaveBeenCalled();
  });
});
