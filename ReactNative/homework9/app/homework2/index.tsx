import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

const PRIORITIES = [
  { label: 'Низкая', value: 1 },
  { label: 'Средняя', value: 2 },
  { label: 'Высокая', value: 3 },
];

type Task = {
  id: string;
  text: string;
  priority: number;
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(1);
  const [sortDesc, setSortDesc] = useState(true);

  const addTask = () => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text, priority }]);
      setText('');
      setPriority(1);
    }
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) =>
    sortDesc ? b.priority - a.priority : a.priority - b.priority,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Новая задача"
          value={text}
          onChangeText={setText}
        />
        <View style={styles.priorityPicker}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p.value}
              style={[styles.priorityBtn, priority === p.value && styles.priorityBtnActive]}
              onPress={() => setPriority(p.value)}
            >
              <Text style={priority === p.value ? styles.priorityTextActive : styles.priorityText}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Добавить" onPress={addTask} />
      </View>
      <View style={styles.sortRow}>
        <Text>Сортировка по важности:</Text>
        <Button
          title={sortDesc ? 'По убыванию' : 'По возрастанию'}
          onPress={() => setSortDesc(!sortDesc)}
        />
      </View>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Text style={styles.priorityLabel}>
              {PRIORITIES.find((p) => p.value === item.priority)?.label}
            </Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteBtn}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Нет задач</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  priorityPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priorityBtn: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 5,
  },
  priorityBtnActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  priorityText: {
    color: '#333',
  },
  priorityTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  priorityLabel: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#007bff',
  },
  deleteBtn: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Index;
