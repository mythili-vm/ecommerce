import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { AddCategory } from "../../State/customer/categorySlice";

// Define Props for Modal
interface AddCategoryModalProps {
  open: boolean;
  handleClose: () => void;
  categories: AddCategory[];
  onAddCategory: (newCategory: AddCategory) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  handleClose,
  categories,
  onAddCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [level, setLevel] = useState(1);
  const [parent, setParent] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  // Get available parents based on selected level
  const availableParents = categories.filter((cat) => cat.level === level - 1);

  const handleSubmit = () => {
    const newCategory: AddCategory = {
      categoryId,
      name: categoryName,
      level,
      parentCategory:
        level > 1 ? categories.find((cat) => cat.id === parent) || null : null,
    };

    onAddCategory(newCategory); // Send data to parent
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          margin="dense"
        />
        <TextField
          select
          fullWidth
          label="Level"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          margin="dense"
        >
          <MenuItem value={1}>Level 1 (Parent)</MenuItem>
          <MenuItem value={2}>Level 2 (Choose Level 1 Parent)</MenuItem>
          <MenuItem value={3}>Level 3 (Choose Level 2 Parent)</MenuItem>
        </TextField>

        {level > 1 && (
          <TextField
            select
            fullWidth
            label="Select Parent"
            value={parent || ""}
            onChange={(e) => setParent(Number(e.target.value))}
            margin="dense"
          >
            {availableParents.length > 0 ? (
              availableParents.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.categoryId} (Level {cat.level})
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Parent Available</MenuItem>
            )}
          </TextField>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          onMouseEnter={() => setIsCancelHovered(true)}
          onMouseLeave={() => setIsCancelHovered(false)}
          variant={isCancelHovered ? "contained" : "outlined"}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant={isHovered ? "contained" : "outlined"}
          color="primary"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Add Category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
