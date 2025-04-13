import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const response = await fetch("http://192.168.0.125:5000/api/vendors");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Vendor 👨‍🔧</Text>
      <Text>Manage your services with Nivaas+</Text>
      <Button title="Reload Vendors" onPress={fetchVendors} />
      <View style={{ marginTop: 20 }}>
        {vendors.length > 0 ? (
          vendors.map((v, index) => (
            <Text key={index}>🧑‍🔧 {v.name || "Vendor"} #{index + 1}</Text>
          ))
        ) : (
          <Text>No vendors found or backend not connected.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
