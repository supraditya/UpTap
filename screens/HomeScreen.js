import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/profileSlice";
import QRCode from "react-native-qrcode-svg";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <View>
      <View style={{ alignItems: 'center'}}>{data.qr_link && <QRCode value={data.qr_link} size={150} />}</View>
      <Text style={{ fontSize: 30 }}>
        {data.firstName} {data.lastName}
      </Text>
    </View>
  );
};

export default HomeScreen;
