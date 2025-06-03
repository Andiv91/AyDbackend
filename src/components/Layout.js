import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Avatar, IconButton, InputBase, CircularProgress } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 220;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar la información del usuario actual
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/me', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        } else {
          console.error('Error al obtener datos del usuario');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Realizar una petición de logout al backend (si tienes un endpoint)
      // o simplemente invalidar la sesión redirigiendo a /login
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Generar iniciales para el avatar si no hay foto
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Determinar si se debe mostrar avatar o iniciales
  const getAvatarContent = () => {
    if (loading) {
      return <CircularProgress size={24} color="inherit" />;
    }
    
    if (!currentUser) {
      return "?";
    }
    
    return getInitials(currentUser.name);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: '#232323', color: '#fff' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', width: '100%' }}>
            <span style={{ fontSize: 32, marginRight: 8 }}>🐍</span> Plataforma Python
          </Typography>
        </Toolbar>
        <List>
          {currentUser?.role === 'TEACHER' ? (
            <>
              <ListItem button component={Link} to="/">
                <ListItemIcon sx={{ color: '#fff' }}><MenuBookIcon /></ListItemIcon>
                <ListItemText primary="Principal" />
              </ListItem>
              <ListItem button component={Link} to="/ver-ejercicios">
                <ListItemIcon sx={{ color: '#fff' }}><CodeIcon /></ListItemIcon>
                <ListItemText primary="Ver ejercicios" />
              </ListItem>
              <ListItem button component={Link} to="/crear-ejercicio">
                <ListItemIcon sx={{ color: '#fff' }}><AddIcon /></ListItemIcon>
                <ListItemText primary="Crear ejercicio" />
              </ListItem>
              <ListItem button component={Link} to="/ver-estudiantes">
                <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Ver estudiantes" />
              </ListItem>
              <ListItem button component={Link} to="/mensajes">
                <ListItemIcon sx={{ color: '#fff' }}><MessageIcon /></ListItemIcon>
                <ListItemText primary="Mensajes" />
              </ListItem>
              <ListItem button component={Link} to="/ajustes">
                <ListItemIcon sx={{ color: '#fff' }}><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Ajustes" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#fff' }}><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/">
                <ListItemIcon sx={{ color: '#fff' }}><MenuBookIcon /></ListItemIcon>
                <ListItemText primary="Principal" />
              </ListItem>
              <ListItem button component={Link} to="/mensajes">
                <ListItemIcon sx={{ color: '#fff' }}><MessageIcon /></ListItemIcon>
                <ListItemText primary="Mensajes" />
              </ListItem>
              <ListItem button component={Link} to="/favoritos">
                <ListItemIcon sx={{ color: '#fff' }}><FavoriteIcon /></ListItemIcon>
                <ListItemText primary="Favoritos" />
              </ListItem>
              <ListItem button component={Link} to="/profesores">
                <ListItemIcon sx={{ color: '#fff' }}><PeopleIcon /></ListItemIcon>
                <ListItemText primary="Profesores" />
              </ListItem>
              <ListItem button component={Link} to="/ajustes">
                <ListItemIcon sx={{ color: '#fff' }}><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Ajustes" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon sx={{ color: '#fff' }}><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </>
          )}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2, color: '#aaa', fontSize: 14 }}>
          Ayuda<br />
          Contáctanos
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ background: '#fff', color: '#232323', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <InputBase
                placeholder="Búsqueda"
                startAdornment={<SearchIcon sx={{ mr: 1 }} />}
                sx={{ background: '#f0f0f0', borderRadius: 2, px: 2, py: 0.5, width: 300, mr: 2 }}
              />
            </Box>
            <IconButton>
              <Avatar alt={currentUser?.name || 'Usuario'} src={currentUser?.imageUrl}>
                {getAvatarContent()}
              </Avatar>
            </IconButton>
            <Typography sx={{ ml: 1, fontWeight: 'bold' }}>
              {loading ? 'Cargando...' : (currentUser?.name || 'Usuario')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 4 }}>
          {React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child, { currentUser })
              : child
          )}
        </Box>
      </Box>
    </Box>
  );
}