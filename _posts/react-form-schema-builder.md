---
date: '2026-09-08'
title: React Form Schema Builder
tagline: A drag-drop builder that generates form code and validates in real time
preview: >
  Building forms in React means writing state management, validation logic, and component bindings over and over. In this project, I created a drag-drop builder where you can compose form fields visually, see them validated live, and export ready-to-use TypeScript code or JSON Schema. No more boilerplate.
image: /images/react-form-schema-builder.png
---

# Introduction

Forms are everywhere in web apps, but they're tedious to write. Every time I build one, I'm managing field state, validation rules, error messages, and binding to the UI — the same patterns repeated. I wanted a tool that would let me compose a form visually, preview it with validation working, and drop the generated code directly into my project.

## The Problem

When you're building multiple similar forms, you're essentially writing the same logic again: define fields, add validation, wire up React Hook Form bindings, handle errors. This is repetitive and error-prone. Frameworks help, but they don't eliminate the friction of starting from scratch each time.

I needed something that would handle the visual composition part and generate the boilerplate so I could focus on what's unique about each form.

## The Approach

I built a two-panel interface. On the left, a palette of available field types (text, select, checkbox, date). You drag fields onto a canvas, reorder them, and configure properties. On the right, you see a live preview of the form as it would appear to a user, with validation already wired up.

The builder tracks the field structure internally and exposes two export formats: a ready-to-paste TypeScript component using React Hook Form, or a JSON Schema definition that's portable and self-documenting.

## Technical Decisions and Why

**Drag and drop with dnd-kit.** I chose [dnd-kit](https://dndkit.com/) over other libraries because it's performant and unopinionated about the visual feedback you want. The palette and canvas are separate components connected through a single `DndContext`, keeping concerns isolated.

**Live validation preview with React Hook Form.** Rather than mock validation, I embedded the actual React Hook Form logic in the preview. That way, you see exactly how validation will behave in the real component. No surprises.

**Codegen for TypeScript components.** The generated component is fully typed and ready to import. It uses the same form state logic, so there's no mismatch between the builder preview and the final code.

**JSON Schema export for portability.** JSON Schema is a standard. If you want to use the form definition elsewhere — in a backend, a different framework, or just as documentation — the schema is self-contained and doesn't lock you into TypeScript.

**Vite and TypeScript from the start.** This isn't a tool that needs to support older browsers. I prioritized fast feedback during development and type safety across the board.

## Results

The builder handles the core field types well and generates usable code immediately. The dual export (TypeScript + JSON Schema) means the project stays useful even if you decide to move the form definition elsewhere later.

The real win is that the boilerplate disappears. Design a form, click export, paste the code, and move on. For repetitive form work, that's a meaningful time save.
