import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [date, setDate] = useState('');

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?apiKey=aebe39d286c04df99d6e69015e20234a&q=&from=${date}&to=${date}`
      );
      const json = await response.json();
      setArticles(json.articles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NewsAPI - Artigos por data</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a data (YYYY-MM-DD)"
        onChangeText={text => setDate(text)}
        value={date}
      />
      <Button title="Buscar" onPress={fetchArticles} />
      {articles.map(article => (
        <Text key={article.title} style={styles.articleTitle}>
          {article.title}
        </Text>
      ))}
    </View>
  );
}

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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  articleTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});
