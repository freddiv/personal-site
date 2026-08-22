import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card component", () => {
  it("renders card with title and description", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project Title</CardTitle>
          <CardDescription>Project summary here.</CardDescription>
        </CardHeader>
        <CardContent>Main content.</CardContent>
      </Card>
    );

    expect(screen.getByText("Project Title")).toBeDefined();
    expect(screen.getByText("Project summary here.")).toBeDefined();
    expect(screen.getByText("Main content.")).toBeDefined();
  });
});
