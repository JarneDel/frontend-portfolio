export default () => {
  const navigation = {
    screens: [
      {
        name: 'about',
        title: 'About',
        url: '/#about',
      },
      {
        name: 'projects',
        title: 'Projects',
        url: '/#projects',
      },
      {
        name: 'contact',
        title: 'Contact',
        url: '/#contact',
      },
      {
        name: 'resume',
        title: 'Resume',
        url: '/resume',
      },
    ],
  }

  return { navigation }
}
