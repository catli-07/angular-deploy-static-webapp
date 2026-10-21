# Angular Employee CRUD (Signals + Service + configurable API)

## Folder structure
```
employee-crud/
├── public/
│   └── config.json                  <- backend URL (edit without rebuilding)
└── src/
    ├── main.ts
    ├── styles.css                   <- global styles
    └── app/
        ├── app.ts / app.config.ts
        ├── core/                    <- app-wide, singleton stuff
        │   └── config/
        │       ├── app-config.model.ts
        │       └── config.service.ts
        └── features/
            └── employees/           <- everything for the Employee feature
                ├── models/          employee.model.ts
                ├── services/        employee.service.ts (signals + HTTP)
                ├── components/
                │   ├── employee-form/   (add / edit form)
                │   └── employee-list/   (table)
                └── pages/
                    └── employees-page/  (container: wires form + list + service)
```

## Setup (Angular 19+)
1. `ng new employee-crud --style=css`
2. Copy `src/` and `public/` from this folder over the generated ones
   (keep the generated `index.html`, `angular.json`, etc.)
3. `ng serve`

## Change the backend URL (no rebuild)
Edit `public/config.json` (or `config.json` inside the built `dist/.../browser` folder):
    { "apiBaseUrl": "https://your-server/api" }

## Endpoints expected
| Action | Request |
|--------|---------|
| List   | GET    {apiBaseUrl}/employees |
| Create | POST   {apiBaseUrl}/employees |
| Update | PUT    {apiBaseUrl}/employees/{id} |
| Delete | DELETE {apiBaseUrl}/employees/{id} |

JSON body (camelCase): id, firstName, lastName, email, position, department

## CORS
Allow the Angular origin on your Web API (.NET example):
    builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
        p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));
    app.UseCors();
