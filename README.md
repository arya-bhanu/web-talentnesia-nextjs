## Talentnasia

An LMS (Learning Management System) is a software platform that facilitates the creation, management, and delivery of educational content and tracks learner progress. It is used in both education and training environments to organize courses, manage materials, conduct assessments, and monitor learning activities

## Application Structure

This structure separates components and features into distinct modules to enhance readability, maintainability, and scalability of the application.

```js
    auth/
    ├── login/
    │   ├── __tests__/
    │   │   └── Login.test.tsx
    │   ├── api/
    │   │   └── loginApi.ts
    │   ├── hooks/
    │   │   └── useLogin.ts
    │   ├── index.ts
    │   ├── login.type.ts
    │   ├── Login.tsx
    │   └── Login.view.tsx
    └── index.ts
```
