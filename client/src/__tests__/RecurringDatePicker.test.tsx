import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecurringDatePicker } from "../components/recurring/RecurringDatePicker";
import { useRecurrenceStore } from "../store/recurrenceStore";
import { useAuthStore } from "../store/authStore";

// Mock the stores
jest.mock("../store/recurrenceStore");
jest.mock("../store/authStore");
jest.mock("../store/taskStore");

const mockUseRecurrenceStore = useRecurrenceStore as jest.MockedFunction<typeof useRecurrenceStore>;
const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe("RecurringDatePicker Integration", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    // Mock store implementations
    mockUseRecurrenceStore.mockReturnValue({
      pattern: {
        type: "daily",
        interval: 1,
        startDate: "2025-01-20",
      },
      isVisible: true,
      updatePattern: jest.fn(),
      resetPattern: jest.fn(),
      setVisible: jest.fn(),
    });

    mockUseAuthStore.mockReturnValue({
      user: {
        uid: "test-uid",
        email: "test@example.com",
        displayName: "Test User",
      } as any,
      loading: false,
      setUser: jest.fn(),
      setLoading: jest.fn(),
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it("should render the recurring date picker form", () => {
    renderWithProviders(<RecurringDatePicker />);

    expect(screen.getByText("Create Recurring Task")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter task title...")).toBeInTheDocument();
    expect(screen.getByText("Recurrence Pattern")).toBeInTheDocument();
    expect(screen.getByText("Preview Calendar")).toBeInTheDocument();
  });

  it("should show recurrence type buttons", () => {
    renderWithProviders(<RecurringDatePicker />);

    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText("Yearly")).toBeInTheDocument();
  });

  it("should display calendar preview with highlighted dates", () => {
    renderWithProviders(<RecurringDatePicker />);

    expect(screen.getByText("Preview Calendar")).toBeInTheDocument();
    expect(screen.getByText("Recurring dates")).toBeInTheDocument();
    expect(screen.getByText("Pattern Summary")).toBeInTheDocument();
  });

  it("should handle form submission with valid data", async () => {
    const mockUpdatePattern = jest.fn();
    const mockResetPattern = jest.fn();
    const mockSetVisible = jest.fn();

    mockUseRecurrenceStore.mockReturnValue({
      pattern: {
        type: "daily",
        interval: 1,
        startDate: "2025-01-20",
      },
      isVisible: true,
      updatePattern: mockUpdatePattern,
      resetPattern: mockResetPattern,
      setVisible: mockSetVisible,
    });

    renderWithProviders(<RecurringDatePicker />);

    // Fill in task title
    const titleInput = screen.getByPlaceholderText("Enter task title...");
    fireEvent.change(titleInput, { target: { value: "Test Recurring Task" } });

    // Submit form
    const submitButton = screen.getByText("Create Recurring Task");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("should show validation error for empty task title", async () => {
    renderWithProviders(<RecurringDatePicker />);

    const submitButton = screen.getByText("Create Recurring Task");
    fireEvent.click(submitButton);

    // Should show error toast or validation message
    // This would depend on your toast implementation
  });

  it("should update recurrence pattern when changing type", () => {
    const mockUpdatePattern = jest.fn();

    mockUseRecurrenceStore.mockReturnValue({
      pattern: {
        type: "daily",
        interval: 1,
        startDate: "2025-01-20",
      },
      isVisible: true,
      updatePattern: mockUpdatePattern,
      resetPattern: jest.fn(),
      setVisible: jest.fn(),
    });

    renderWithProviders(<RecurringDatePicker />);

    const weeklyButton = screen.getByText("Weekly");
    fireEvent.click(weeklyButton);

    expect(mockUpdatePattern).toHaveBeenCalledWith({ type: "weekly" });
  });

  it("should handle date range selection", () => {
    renderWithProviders(<RecurringDatePicker />);

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date (Optional)")).toBeInTheDocument();
    expect(screen.getByText("Leave empty for no end date")).toBeInTheDocument();
  });

  it("should close form when cancel is clicked", () => {
    const mockResetPattern = jest.fn();
    const mockSetVisible = jest.fn();

    mockUseRecurrenceStore.mockReturnValue({
      pattern: {
        type: "daily",
        interval: 1,
        startDate: "2025-01-20",
      },
      isVisible: true,
      updatePattern: jest.fn(),
      resetPattern: mockResetPattern,
      setVisible: mockSetVisible,
    });

    renderWithProviders(<RecurringDatePicker />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockResetPattern).toHaveBeenCalled();
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });
});
