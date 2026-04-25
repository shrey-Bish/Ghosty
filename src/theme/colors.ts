export const colors = {
  background: '#0D1117',
  backgroundSoft: '#111722',
  surface: '#161B22',
  surfaceRaised: '#1D2430',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(245,158,11,0.44)',
  text: '#F0F0EE',
  textMuted: '#8B8E98',
  amber: '#F59E0B',
  amberSoft: 'rgba(245,158,11,0.16)',
  teal: '#14B8A6',
  tealSoft: 'rgba(20,184,166,0.16)',
  red: '#F43F5E',
  redSoft: 'rgba(244,63,94,0.16)',
  purple: '#A78BFA',
  coral: '#FB7185',
  grayChip: '#242B36',
  black: '#05070A'
};

export const intentColors = {
  recruiting: colors.amber,
  mentor: colors.purple,
  collaborator: colors.teal,
  amplifier: colors.coral,
  peer: colors.textMuted
} as const;
