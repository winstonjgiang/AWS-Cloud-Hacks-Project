import { Button } from "@chakra-ui/react";

export default function LoginForm({ auth }) {
  return (
    <div>
      <h1>Understand how you spend your time</h1>
      <p>
        CalendarStats transforms your calendar data into actionable insights.
        Track your time, identify patterns, and optimize your schedule.
      </p>
      <Button onClick={() => auth.signinRedirect()}>Sign in</Button>
    </div>
  );
}
