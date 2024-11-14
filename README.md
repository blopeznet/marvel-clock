# Marvel Comics Cover Slideshow & Clock

This project is a comic cover slideshow and clock that can be used as a screensaver. It leverages the Marvel API to display random comic covers with dynamic filters for a personalized experience. This project is part of my portfolio and was created for the pleasure of developing a creative solution that utilizes the Marvel API—no monetary or income-generating purpose.

## Key Features

- **Comic Cover Slideshow**: Displays a rotating selection of comic book covers.
- **Custom Filters**: Filter comics by year range, character, and result limit.
- **Dynamic Backgrounds**: Comic cover images appear as backgrounds in the interface.
- **Clock**: Displays the current time in the app for a screensaver effect.
- **Marvel API Integration**: Uses the Marvel API to fetch comic cover data in real-time.

## Technologies Used

- **Vue 3 + Vite**: For fast, modern front-end development using Vue's `<script setup>` syntax.
- **Pinia**: State management to handle UI state and API data.
- **Axios**: To fetch data from the Marvel API.
- **md5**: For secure hashing to meet Marvel API requirements.
- **localStorage**: Saves user settings (filters, selected characters) to retain preferences between sessions.

## Setup & Installation

1. **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd your_project_name
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Marvel API Setup**: Create a `.env` file with your Marvel API keys:
    ```plaintext
    VITE_PUBLIC_KEY=your_public_key
    VITE_PRIVATE_KEY=your_private_key
    ```

4. **Run the app**:
    ```bash
    npm run dev
    ```

5. **Build for production**:
    ```bash
    npm run build
    ```

## Usage

This project is intended as a portfolio piece and does not generate any income. Feel free to explore, modify, or expand upon it for personal use.

For any questions or collaboration inquiries, please contact me at [borjalgarcia@hotmail.com](mailto:borjalgarcia@hotmail.com).

Enjoy the Marvel-inspired screensaver!

If you'd like to see the deployed example, visit the GitHub Page: [https://blopeznet.github.io/marvel-clock/](https://blopeznet.github.io/marvel-clock/)

