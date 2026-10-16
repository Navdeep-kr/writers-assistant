import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  // Premium Dark Palette (The "Just Before" Look)
  static const Color background = Color(0xFF030304); // Pure Night
  static const Color surface = Color(0xFF0C0D0F); // Deep Charcoal
  static const Color primary = Color(0xFF22D3EE); // Electric Cyan
  static const Color accent = Color(0xFF3B82F6); // Professional Blue
  
  static const Color success = Color(0xFF10B981); // Emerald
  static const Color error = Color(0xFFF43F5E); // Rose
  static const Color warning = Color(0xFFFACC15); // Amber
  
  static const Color text = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF475569);
  
  static LinearGradient primaryGradient = const LinearGradient(
    colors: [Color(0xFF22D3EE), Color(0xFF3B82F6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static LinearGradient glassGradient = LinearGradient(
    colors: [Colors.white.withOpacity(0.02), Colors.white.withOpacity(0.01)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class AppTheme {
  static ThemeData get darkTheme {
    final baseTheme = ThemeData.dark();
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      primaryColor: AppColors.primary,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        brightness: Brightness.dark,
        primary: AppColors.primary,
        secondary: AppColors.accent,
        surface: AppColors.surface,
        onSurface: AppColors.text,
        error: AppColors.error,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme(baseTheme.textTheme).apply(
        bodyColor: AppColors.text,
        displayColor: AppColors.text,
      ),
      dividerTheme: DividerThemeData(
        color: Colors.white.withOpacity(0.05),
        thickness: 1,
      ),
    );
  }
}
