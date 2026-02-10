import { useLocation } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get("q");

  const data = useLazyLoadQuery(NavbarInputQuery, { term });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Results for "{term}"</Typography>
      {data.globalSearch.map((result) => (
        <ListItem key={result.id}>
          <ListItemText 
            primary={result.name} 
            secondary={result.__typename === 'Restaurant' ? 'Restaurant' : 'Menu Item'} 
          />
        </ListItem>
      ))}
    </Box>
  );
};