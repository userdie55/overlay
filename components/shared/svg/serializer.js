export function attachSerializer(group, state) {
  group.getRectData = () => ({ ...state });
}
