import React from 'react';
import { Typography } from '../../components/ui/Typography';
import { CodeBlock } from '../../components/ui/CodeBlock';
import { CodeExample } from '../../components/playground/CodeExample';
import { Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '../../components/ui/table';
export default function Introduction() {
  return (
    <article className="max-w-3xl mx-auto font-sans space-y-10">
      <div>
        <div>
          <Typography variant="h1">Introduction: CSS Styling</Typography>
          <Typography variant="lead">
            Bringing the web to life with vibrant colors, modern layouts, and beautiful typography.
          </Typography>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Level Overview</Typography>
          <Typography>
            CSS (Cascading Style Sheets) controls how your HTML looks. Colors, fonts, layouts, spacing — all done with CSS.
          </Typography>
          <Typography>
            Duration: 4-6 weeks
          </Typography>
          <Typography>
            Modules in this Level:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>Introduction to CSS</li>
            <li>Selectors & Specificity</li>
            <li>Colors, Backgrounds & Typography</li>
            <li>The Box Model</li>
            <li>Layout & Positioning</li>
            <li>Flexbox & Responsive Design</li>
            <li>Project: Styled Portfolio</li>
            <li>CSS Grid Layout</li>
            <li>CSS Variables & Animations</li>
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
            <li>Built your Personal Bio Page</li>
            <li>Earned HTML Fundamentals Badge</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">What You&apos;ll Build</Typography>
          <Typography>
            By the end of this level, you will transform your plain HTML bio page into a beautifully styled portfolio:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>BEFORE (HTML Only) AFTER (HTML + CSS)</li>
            <li>My Name ████████████████████████████████████</li>
            <li>• About Me →</li>
            <li>• Skills PHOTO MY NAME</li>
            <li>• Contact Software Dev</li>
            <li>Plain text... ╔ ╗</li>
            <li>║ Beautiful, styled content ║</li>
            <li>╚ ╝</li>
            <li>Plain &amp; boring</li>
            <li>Professional &amp; impressive!</li>
          </ul>
        </div>
      </div>
      <div>
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
                <TableCell>02</TableCell>
                <TableCell>Introduction to CSS</TableCell>
                <TableCell>What CSS is, how to add it, and the Cascade</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>03</TableCell>
                <TableCell>Selectors &amp; Specificity</TableCell>
                <TableCell>Targeting elements precisely with combinators</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>04</TableCell>
                <TableCell>Colors &amp; Typography</TableCell>
                <TableCell>Visual styling, Google Fonts, and alignment</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>05</TableCell>
                <TableCell>The Box Model</TableCell>
                <TableCell>Spacing: margin, padding, border, and display</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>06</TableCell>
                <TableCell>Layout &amp; Positioning</TableCell>
                <TableCell>Relative, Absolute, Fixed, and Sticky positioning</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>07</TableCell>
                <TableCell>Flexbox &amp; Responsive</TableCell>
                <TableCell>Modern 1D layout and media queries</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>08</TableCell>
                <TableCell>Variables &amp; Animations</TableCell>
                <TableCell>Theming and making interfaces come alive</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>09</TableCell>
                <TableCell>CSS Grid</TableCell>
                <TableCell>Advanced 2D layout and grid areas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10</TableCell>
                <TableCell>Project: Portfolio</TableCell>
                <TableCell>Building a professional portfolio card</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">CSS Changes Everything</Typography>
          <CodeExample 
            html={`<h1>Welcome to KOOMPI</h1>
<p>This is how CSS transforms your page.</p>`}
            css={`body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #fdf6ec;
  padding: 20px;
  border-radius: 12px;
}
h1 {
  color: #c2622d;
  text-align: center;
}`}
            title="CSS in Action"
            height="220px"
          />
        </div>
      </div>
      <div>
        <div>
          <Typography variant="h2">Track Completion</Typography>
          <Typography>
            To complete Track 02:
          </Typography>
          <ul className="list-disc pl-8 mb-6 space-y-2 text-text-secondary">
            <li>All 9 modules studied</li>
            <li>All interactive challenges completed</li>
            <li>Responsive Portfolio built and working</li>
            <li>Mentor verification received</li>
            <li>CSS Styling Badge earned</li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <Typography>
            Time to make your websites beautiful!
          </Typography>
          <Typography>
            Start with Module 01: Introduction to CSS
          </Typography>
        </div>
      </div>
    </article>
  );
}
