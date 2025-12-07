"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Logo } from "../ui/Logo";
import { Tilt_Neon } from "next/font/google";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const pages = [
  { title: "Sobre Mi", url: "/about" },
  { title: "Servicios", url: "/service" },
  { title: "Contacto", url: "#" },
  { title: "Turnos", url: "/appointments", isvisible: true },
];
const settings = [
  { title: "Perfil", action: "profile" },
  { title: "Cerrar Sesión", action: "logout" },
];

export const ResponsiveAppBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (action: string) => {
    handleCloseUserMenu();
    if (action === "logout") {
      signOut({ callbackUrl: "/login" });
    } else if (action === "profile") {
      router.push("/profile");
    }
  };

  
  const getInitials = () => {
    if (!session?.user?.name) return "U";
    const names = session.user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <AppBar
      position='static'
      sx={{
        bgcolor: "#e7dfd8",
        color: "black",
        border: "none",
        boxShadow: "none",
      }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 0.8,
              margin: "5px",
              display: { xs: "none", md: "flex" },
            }}>
            <Logo />
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
            }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => {
                // Ocultar "Turnos" si no hay sesión activa
                if (page.title === "Turnos" && !session?.user) {
                  return null;
                }
                return (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {page.title}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0.9, display: { xs: "felx", md: "none" } }}>
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              // Ocultar "Turnos" si no hay sesión activa
              if (page.title === "Turnos" && !session?.user) {
                return null;
              }
              return (
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  href={page.url}
                  sx={{ my: 2, mx: 2, color: "black", display: "block" }}>
                  {page.title}
                </Button>
              );
            })}
          </Box>
          <Box>
            {session?.user ? (
              <>
                <Tooltip title={session.user.name || "Usuario"}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {session.user.image ? (
                      <Avatar 
                        alt={session.user.name || "Usuario"} 
                        src={session.user.image}
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        {getInitials()}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #e0e0e0" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {session.user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.user.email}
                    </Typography>
                  </Box>
                  {settings.map((setting) => (
                    <MenuItem key={setting.action} onClick={() => handleSettingClick(setting.action)}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                sx={{ color: "black" }}>
                Iniciar Sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
