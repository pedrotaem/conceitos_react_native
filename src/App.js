import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "https://github.com/pedrotaem/Desafio_1-_Conceitos_do_NodeJS",
      techs: [ "Javascript"]	
    })
    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repositoryIndex = [...repositories].findIndex((repository) => repository.id === id);
    const repositories_total = [...repositories];
    repositories_total.splice(repositoryIndex,1);
    setRepositories(repositories_total);
  }

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`)

    const likedRepository = response.data;

    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id ) { 
        return likedRepository;
      } else {
        return repository;
      }
    });

    setRepositories(repositoriesUpdated);
    // await api.post(`/repositories/${id}/like`)
    // const repositoryIndex = [...repositories].findIndex((repository) => repository.id === id);
    // const repositories_total = [...repositories];
    // repositories_total[repositoryIndex].likes += 1
    // setRepositories(repositories_total);
    // await app.post(`/repositories/${id}/like`, (request, response) => {
    //   const { id } = request.params;
    //   const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
    //   if (repositoryIndex < 0) {
    //     return response.status(400).json({ error: 'Repository not found.' });
    //   }
    //   repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1
    //   return response.json(repositories[repositoryIndex]);
    // });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({ item: repository }) => (
          <>
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text style={styles.tech} key={repository.techs.indexOf(tech)}>{tech}</ Text>
                ))}  
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
