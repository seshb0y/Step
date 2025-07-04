import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="homework1/index" options={{ title: 'Homework 1' }} />
      <Tabs.Screen name="homework2/index" options={{ title: 'Homework 2' }} />
    </Tabs>
  );
}
