# FSD Labs

## What change you wanted to make

In Lab 5.2, I wanted to improve how my application loads data from the backend. In the previous lab, the front-end mostly used useEffect and fetch directly. That worked, but it made the component handle too much logic. I wanted to try a more modern way to manage server data in React.

## 2. What tool you used

I used TanStack Query in the front-end React application. This tool helps manage server state such as loading, error, and successful responses. Instead of manually writing state variables and effect logic for every request, I used useQuery to fetch employee data from the backend in a more organized way.

## 3. How it affects user experience

This change improves the user experience by making the loading and error states clearer and more consistent. The page can show when data is still being loaded and when something goes wrong with the backend request. It also makes future updates easier, such as refreshing data after creating a new employee.

## 4. How it affects your understanding

This change helped me better understand that not all React state should be treated the same way. Some state belongs only in the UI, but some state comes from the server and should be managed differently. Using TanStack Query helped me see the difference between local component state and server state in a full-stack application.