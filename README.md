# Integrated IoT based Aquaponics (Aquaculture and Hydroponics) System

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules. The application is designed to visualize water quality data fetched from a Firebase Realtime Database.

## Live Site

You can view the live application [here](https://iot-aquaponic.netlify.app/).

## Overview

The Integrated IoT based Aquaponics System is a user-friendly interface that displays various water quality parameters, including pH, turbidity, TDS (Total Dissolved Solids), dissolved oxygen, water temperature, humidity, air temperature, air heat index, and water level. Each parameter is represented by a card that shows the latest data and a line chart for historical trends.

## Features

- **Real-time Data Fetching**: The application fetches data from Firebase Realtime Database, ensuring that users always see the most current information.
- **Interactive Charts**: Each card displays a line chart that visualizes the historical data for the selected parameter.
- **Download Options**: Users can download the current data in CSV or JSON format, as well as download all data in CSV format.
- **Responsive Design**: The dashboard is designed to be responsive, providing a seamless experience on both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- A Firebase project with Realtime Database enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/water-dashboard.git
   cd water-dashboard
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a Realtime Database to your project.
   - Obtain your Firebase configuration object.

4. Create a `.env` file in the root of your project and add your Firebase configuration:
   ```plaintext
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Code Structure

- **src/App.jsx**: The main application component that manages the state of the active card and handles data fetching from Firebase.
- **src/components/Card.jsx**: A reusable component that displays the data for each parameter, including the latest value and a line chart of historical data.

### Data Structure

The data fetched from Firebase should follow this structure:

```json
{
  "data": [
    {
      "title": "pH",
      "yAxisData": [6.5, 7.0, ...],
      "bgcolor": "bg-green-300",
      "lineChartColor": "#A5D6A7",
      "color": "text-green-700",
      "icon": "FaWater"
    },
    ...
  ]
}
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/) - A fast build tool and development server.
- [Firebase](https://firebase.google.com/) - A platform for building mobile and web applications.
- [react-google-charts](https://react-google-charts.com/) - A library for rendering Google Charts in React.
- [framer-motion](https://www.framer.com/motion/) - A library for animations in React.

```
This README provides a comprehensive overview of the Integrated IoT based Aquaponics System application, including its features, setup instructions, and code structure, along with a link to the live site.
```
