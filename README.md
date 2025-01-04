# NestJS OTP Authentication System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">An advanced OTP authentication system built with NestJS</p>

## Features

- OTP Authentication via Mobile
- JWT-based Access Control with Guards
- Iranian Mobile Number Validation
- JWT Token Management
- Modular and Scalable Architecture

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   └── auth.dto.ts         # Authentication DTOs
│   ├── guards/
│   │   └── auth.guard.ts       # Route protection guard
│   ├── auth.controller.ts      # OTP management controller
│   └── auth.service.ts         # Core authentication service
├── user/
│   └── user.controller.ts      # User profile controller
└── common/
    └── ResponseModel.ts        # Unified API response model
```

## API Endpoints

### Authentication
```typescript
POST /auth/send-otp
Body: {
  "mobile": "09123456789"  // Iranian mobile number
}

POST /auth/check-otp
Body: {
  "mobile": "09123456789",
  "code": "12345"         // Received OTP code
}
```

### User Profile
```typescript
GET /user/profile          // Requires JWT token
Headers: {
  "Authorization": "Bearer <token>"
}
```

## Validation Rules

- Mobile: Iranian phone number format
- OTP Code: 5-character string
- Token: Valid JWT in Authorization header

## Installation & Setup

```bash
# Install dependencies
npm install

# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

## Guard Usage Example

```typescript
@Controller('protected-route')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get()
  getData(@Req() request: Request) {
    const user = request.user;
    // Your protected route logic
  }
}
```

## Response Examples

### Successful OTP Send
```json
{
  "statusCode": 201,
  "message": "send otp is successful",
  "data": {
    "mobile": "09123456789"
  }
}
```

### Successful Login
```json
{
  "statusCode": 200,
  "message": "Login is successful",
  "data": {
    "access_token": "eyJhbG..."
  }
}
```

## Error Handling

The system includes comprehensive error handling for:
- Invalid mobile numbers
- Incorrect OTP codes
- Invalid or expired JWT tokens
- Unauthorized access attempts

## Security Features

1. **Token Validation**
   - JWT format verification
   - Bearer token scheme enforcement
   - Automatic token validation in guards

2. **OTP Security**
   - 5-digit numeric codes
   - Mobile number validation
   - Rate limiting (implementation required)

3. **Request Validation**
   - DTO-based validation
   - Class-validator implementation
   - Custom validation pipes

## Development Guidelines

1. **Controllers**
   - Use appropriate HTTP methods
   - Implement response model pattern
   - Proper error handling with exceptions

2. **DTOs**
   - Implement validation decorators
   - Use transformation when needed
   - Proper error messages

3. **Guards**
   - Implement proper token extraction
   - Handle all error cases
   - Type safety implementation

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Upcoming Features

- Refresh token implementation
- Rate limiting for OTP requests
- Email OTP support
- Multiple factor authentication
- Session management
