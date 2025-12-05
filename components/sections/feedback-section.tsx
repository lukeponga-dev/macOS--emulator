"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function FeedbackSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Get in Touch
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Feedback</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We'd love to hear your thoughts, suggestions, or any issues you've encountered.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>
            Your feedback is valuable to us and helps improve the emulator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your message here..."
            rows={8}
          />
        </CardContent>
        <CardFooter>
          <Button>Submit Feedback</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
