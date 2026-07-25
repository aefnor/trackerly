import { useNavigation } from "@react-navigation/native";

import EditProfileScreen from "@/screens/EditProfileScreen";

export default function EditProfile() {
  const navigation = useNavigation<any>();

  return <EditProfileScreen navigation={navigation} />;
}
