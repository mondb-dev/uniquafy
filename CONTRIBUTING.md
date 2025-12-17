# Contributing to Uniquafy

Thank you for your interest in contributing to Uniquafy! 🌸🐞✨

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/uniquafy.git
   cd uniquafy
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Build and Test**
   ```bash
   npm run build
   npm run dev
   ```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

## Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, maintainable code
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

## Commit Message Guidelines

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## Testing

Before submitting a PR:
1. Ensure the code builds without errors
2. Test the bot with real Twitter interactions (if possible)
3. Verify environment variables are properly documented

## Areas for Contribution

- **Image Processing**: Improve the Vertex AI integration
- **Error Handling**: Add better error messages and recovery
- **Documentation**: Improve setup guides and troubleshooting
- **Features**: Add new transformation styles or triggers
- **Testing**: Add unit tests and integration tests

## Questions?

Feel free to open an issue if you have questions or need help!

Happy coding! 🌸🐞✨
