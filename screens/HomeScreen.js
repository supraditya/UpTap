import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/profileSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <View>
      <Text>
        {data.firstName} {data.lastName}
      </Text>
    </View>
  );
};

export default HomeScreen;
