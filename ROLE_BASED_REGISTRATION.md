# Role-Based Registration Implementation

This document describes the implementation of role-based registration in the HomeSphere backend.

## Overview

The implementation provides a unified registration endpoint that handles all user roles (user, agent, admin) with role-specific fields stored in a single User model.

## Database Schema Changes

### Migration File
A migration file has been created at `migrations/20230801000000-add-role-fields-to-users.js` to add role-specific fields to the database tables.

### Updated Models

1. **User Model**: Added the following fields:
   - `role`: STRING (default: 'user')
   - `businessName`: STRING (nullable)
   - `licenseNumber`: STRING (nullable)
   - `yearsOfExperience`: INTEGER (nullable)
   - `department`: STRING (nullable)
   - `employeeId`: STRING (nullable)

2. **Agent Model**: Added the following field:
   - `yearsOfExperience`: INTEGER (nullable)

3. **Admin Model**: Added the following field:
   - `employeeId`: STRING (nullable)

## API Endpoints

### New Unified Registration Endpoint
- **POST** `/api/auth/register`
- Handles registration for all roles (user, agent, admin)
- Validates role-specific required fields

### Request Body
```json
{
  "role": "user|agent|admin",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "password": "string",
  "phone": "string (for user and agent roles)",
  "businessName": "string (for agent role)",
  "licenseNumber": "string (for agent role)",
  "yearsOfExperience": "number (for agent role)",
  "department": "string (for admin role)",
  "employeeId": "string (for admin role)"
}
```

### Response Format
```json
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "agent",
    "businessName": "Agent Business" // (for agent role)
  }
}
```

## Backward Compatibility

The implementation maintains backward compatibility by:
1. Keeping existing registration endpoints (`/api/auth/register/user`, `/api/auth/register/agent`)
2. Creating entries in both the unified User table and role-specific tables
3. Checking both the unified User table and role-specific tables during login/profile retrieval

## Implementation Details

### Registration Logic
1. Validates required fields based on role
2. Checks for existing users across all tables
3. Creates user in the unified User table with role-specific fields
4. Also creates user in role-specific table for backward compatibility
5. Returns JWT token with user ID and role

### Login Logic
1. Checks for user in the unified User table first
2. Falls back to role-specific tables for backward compatibility
3. Returns role-specific user data in response

### Profile Retrieval
1. Checks the unified User table first for role-based data
2. Falls back to role-specific tables for backward compatibility
3. Returns complete user profile with role-specific fields

## Testing

To test the implementation:

1. Register a new user:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "role": "user",
       "email": "user@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "password": "password123",
       "phone": "1234567890"
     }'
   ```

2. Register a new agent:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "role": "agent",
       "email": "agent@example.com",
       "firstName": "Jane",
       "lastName": "Smith",
       "password": "password123",
       "phone": "0987654321",
       "businessName": "Real Estate Agency",
       "licenseNumber": "RE123456",
       "yearsOfExperience": 5
     }'
   ```

3. Register a new admin:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "role": "admin",
       "email": "admin@example.com",
       "firstName": "Admin",
       "lastName": "User",
       "password": "password123",
       "department": "IT",
       "employeeId": "EMP001"
     }'
   ```

## Security Considerations

1. Passwords are hashed using bcrypt with 12 rounds
2. Input validation is performed for all required fields
3. Rate limiting is implemented via express-rate-limit
4. JWT tokens are used for authentication with 7-day expiration
5. HTTPS should be used in production environments

## Error Handling

The API returns appropriate error responses:
- 400 Bad Request: Missing or invalid required fields
- 409 Conflict: Email or phone already exists
- 500 Internal Server Error: Server-side errors

Example error response:
```json
{
  "error": "Missing required fields for agent"
}