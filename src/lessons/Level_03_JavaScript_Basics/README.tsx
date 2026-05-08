
import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-14 py-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-foreground">
          JavaScript Basics
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
          Adding interactivity, dynamic data, and logic to transform static pages into web apps. 
          Master the fundamentals of the most popular language on the web.
        </p>
      </section>

      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            JavaScript brings your websites to life! It makes things interactive — clicking buttons, updating content, responding to users.
          </Typography>
          <Typography>
            Duration: 6-8 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
            <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
              <li>Introduction to JavaScript</li>
              <li>Variables &amp; Data Types</li>
              <li>Operators &amp; Conditions</li>
              <li>Functions Basics</li>
              <li>Data Structures: Arrays &amp; Strings</li>
              <li>Objects Basics</li>
              <li>DOM Manipulation</li>
              <li>Project: Interactive Quiz</li>
            </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Prerequisites</Typography>
          <Typography>
            Before starting this level, you should have:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Completed Track 01: HTML Fundamentals</li>
            <li>Completed Track 02: CSS Styling</li>
            <li>Built your styled portfolio</li>
            <li>Earned Web Developer Apprentice Certificate</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            By the end of this level, you will create an interactive quiz application:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>CAMBODIA KNOWLEDGE QUIZ</li>
            <li>Question 3 of 10</li>
            <li>What is the capital of Cambodia?</li>
            <li>A) Siem Reap</li>
            <li>B) Phnom Penh</li>
            <li>C) Battambang</li>
            <li>Score: 2/2 correct</li>
            <li>[ NEXT QUESTION → ]</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">JavaScript Changes Everything</Typography>
          <CodeBlock language="javascript">{`// Just a few lines of JavaScript...
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
 alert('Hello, KOOMPI Apprentice!');
});
// ...makes your pages respond to users!`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">JavaScript Uses</Typography>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>What JS Does</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Respond to clicks</TableCell>
                <TableCell>Button shows modal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Validate forms</TableCell>
                <TableCell>Check email format before submit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Update content</TableCell>
                <TableCell>Show new data without page reload</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Animate elements</TableCell>
                <TableCell>Smooth scrolling, fade effects</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fetch data</TableCell>
                <TableCell>Load content from servers</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Build apps</TableCell>
                <TableCell>Interactive web applications</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <Typography variant="h2">Module Index</Typography>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Key Concepts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>01</TableCell>
                <TableCell>Introduction</TableCell>
                <TableCell>Level overview, environment setup, and first script</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>02</TableCell>
                <TableCell>Variables &amp; Data Types</TableCell>
                <TableCell>let, const, naming conventions, and core types</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Operators &amp; Conditions</TableCell>
                <TableCell>Math, nested conditions, and nullish coalescing</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>Functions Basics</TableCell>
                <TableCell>Declarations, arrow functions, and basic scope</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>Data Structures: Arrays &amp; Strings</TableCell>
                <TableCell>Iterating and manipulating text and collections</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>Objects Basics</TableCell>
                <TableCell>Properties, methods, and shorthand syntax</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>07</TableCell>
                <TableCell>DOM Manipulation</TableCell>
                <TableCell>Selecting elements and updating content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>08</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Interactive Quiz Application</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Key Concepts</Typography>
          
          <Typography variant="h3">Variables &amp; Data Types</Typography>
          <CodeBlock language="javascript">{`// Declaring variables
const name = "KOOMPI"; // Immutable
let score = 0;        // Mutable

// Core Data Types
const string = "Hello";
const number = 42;
const boolean = true;
const array = [1, 2, 3];
const object = { key: "value" };`}</CodeBlock>
          
          <Typography variant="h3">Conditions &amp; Loops</Typography>
          <CodeBlock language="javascript">{`// If-Else condition
if (score >= 50) {
  console.log("You passed!");
} else {
  console.log("Try again!");
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}`}</CodeBlock>

          <Typography variant="h3">Functions Basics</Typography>
          <CodeBlock language="javascript">{`// Basic function declaration
function greet(user) {
  return "Hello " + user;
}

// Arrow function (Modern)
const add = (a, b) => a + b;

console.log(greet("Apprentice")); // Hello Apprentice`}</CodeBlock>

          <Typography variant="h3">DOM Manipulation</Typography>
          <CodeBlock language="javascript">{`// Selecting an element
const title = document.querySelector('h1');

// Changing content
title.textContent = "New Title";

// Handling events
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  alert('Button clicked!');
});`}</CodeBlock>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 03:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 8 modules studied</li>
            <li>All exercises completed</li>
            <li>Interactive Quiz built and working</li>
            <li>Quiz has multiple questions, scoring, and results</li>
            <li>Mentor verification received</li>
            <li>JavaScript Basics Badge earned</li>
            <li>JavaScript Developer Certificate awarded!</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Time to make your websites interactive!
          </Typography>
          <Typography>
            Start with Module 01: Introduction to JavaScript
          </Typography>
        </div>
      </div>
    </article>
  );
}
